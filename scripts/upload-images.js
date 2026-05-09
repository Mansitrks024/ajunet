require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const axios = require("axios");
const path = require("path");

// ===============================
// CLOUDINARY CONFIG
// ===============================

// Validate environment variables
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("Missing Cloudinary environment variables!");
  console.error("Please create a .env file with:");
  console.error("CLOUDINARY_CLOUD_NAME=your_cloud_name");
  console.error("CLOUDINARY_API_KEY=your_api_key");
  console.error("CLOUDINARY_API_SECRET=your_api_secret");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ===============================
// LOAD YOUR JSON FILE
// ===============================
// const products = require("../src/data/ewind_products.json");
const products = require("../src/data/products-cloudinary.json");

// ===============================
// CREATE TEMP FOLDER
// ===============================
const tempDir = path.join(__dirname, "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// ===============================
// DOWNLOAD IMAGE
// ===============================

async function downloadImage(url, filepath) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      timeout: 30000,
      validateStatus: (status) => status === 200, // Only accept 200 OK

      headers: {
        Accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",

        "Accept-Language": "en-US,en;q=0.9",

        Referer: "https://www.ewindnet.com/",

        Origin: "https://www.ewindnet.com",

        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",

        Connection: "keep-alive",
      },
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      let downloadedBytes = 0;

      response.data.pipe(writer);

      response.data.on("data", (chunk) => {
        downloadedBytes += chunk.length;
      });

      writer.on("finish", () => {
        // Check if file is too small (likely error page)
        if (downloadedBytes < 1000) {
          const stats = fs.statSync(filepath);
          console.warn(
            `Warning: Downloaded file is very small (${stats.size} bytes) - might be an error page`,
          );
        }
        resolve();
      });

      writer.on("error", reject);
    });
  } catch (error) {
    if (error.response) {
      console.error(`HTTP Error ${error.response.status} for ${url}`);
      throw new Error(
        `HTTP ${error.response.status}: ${error.response.statusText}`,
      );
    } else if (error.code === "ECONNABORTED") {
      console.error(`Timeout for ${url}`);
      throw new Error("Download timeout");
    } else {
      console.error(`Download error for ${url}:`, error.message);
      throw error;
    }
  }
}

// ===============================
// GET FILE EXTENSION FROM URL
// ===============================
function getFileExtension(url) {
  const urlPath = new URL(url).pathname;
  const extension = path.extname(urlPath);
  return extension || ".jpg"; // Default to .jpg if no extension found
}

// ===============================
// VALIDATE IMAGE FILE
// ===============================
function validateImageFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    // Check if file is empty
    if (fileSize === 0) {
      throw new Error("File is empty");
    }

    // Check if file is too small (likely corrupted)
    if (fileSize < 100) {
      throw new Error("File too small, likely corrupted");
    }

    // Read first few bytes to check file signature
    const buffer = fs.readFileSync(filePath, { start: 0, end: 20 });
    const hex = buffer.toString("hex");
    // Common image signatures
    const imageSignatures = {
      ffd8ffe0: "JPEG", // JPEG
      ffd8ffe1: "JPEG", // JPEG
      "89504e47": "PNG", // PNG
      47494638: "GIF", // GIF
      52494646: "WEBP", // WEBP (RIFF)
      52494646: "WEBP", // WEBP
    };

    const signature = hex.substring(0, 8);
    const format = imageSignatures[signature];

    if (!format) {
      console.warn(
        `Unknown file signature: ${signature} - file might not be a valid image`,
      );
    }

    return true;
  } catch (error) {
    console.error(`File validation failed: ${error.message}`);
    return false;
  }
}

// ===============================
// UPLOAD TO CLOUDINARY
// ===============================
async function uploadToCloudinary(localPath, fileName) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "products",
      public_id: fileName,
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error details:", {
      message: error.message,
      http_code: error.http_code,
      name: error.name,
    });

    if (error.http_code === 404) {
      console.error("❌ 404 Error: This usually means:");
      console.error("   - Cloudinary cloud name is incorrect");
      console.error("   - API key or secret is wrong");
      console.error("   - Cloudinary account doesn't exist");
      console.error(
        `   - Current cloud name: ${process.env.CLOUDINARY_CLOUD_NAME}`,
      );
    }

    throw error;
  }
}

// ===============================
// MAIN FUNCTION
// ===============================

async function main() {
  const updatedProducts = [];

  for (const product of products) {
    try {
      // =========================
      // MAIN IMAGE
      // =========================
      let newImageUrl = product.image_url;

      if (product.image_url) {
        try {
          const mainFileName =
            (product.title || "product")
              .replace(/[^a-zA-Z0-9]/g, "-")
              .toLowerCase() + "-main";

          const fileExtension = getFileExtension(product.image_url);
          const mainTempPath = path.join(
            tempDir,
            `${mainFileName}${fileExtension}`,
          );

          await downloadImage(product.image_url, mainTempPath);

          // Validate the downloaded file
          if (!validateImageFile(mainTempPath)) {
            throw new Error("Downloaded file is not a valid image");
          }

          newImageUrl = await uploadToCloudinary(mainTempPath, mainFileName);

          fs.unlinkSync(mainTempPath);
        } catch (err) {
          console.error("Main image failed:", err.message);
        }
      }

      // =========================
      // GALLERY IMAGES
      // =========================
      let newGalleryImages = [];

      if (product.gallery_images && Array.isArray(product.gallery_images)) {
        for (let i = 0; i < product.gallery_images.length; i++) {
          const galleryUrl = product.gallery_images[i];

          try {
            const galleryFileName =
              (product.title || "product")
                .replace(/[^a-zA-Z0-9]/g, "-")
                .toLowerCase() + `-gallery-${i}`;

            const galleryFileExtension = getFileExtension(galleryUrl);
            const galleryTempPath = path.join(
              tempDir,
              `${galleryFileName}${galleryFileExtension}`,
            );

            await downloadImage(galleryUrl, galleryTempPath);

            // Validate the downloaded file
            if (!validateImageFile(galleryTempPath)) {
              throw new Error("Downloaded file is not a valid image");
            }

            const uploadedGalleryUrl = await uploadToCloudinary(
              galleryTempPath,
              galleryFileName,
            );

            fs.unlinkSync(galleryTempPath);

            newGalleryImages.push(uploadedGalleryUrl);
          } catch (err) {
            console.error(`Gallery failed ${i}:`, err.message);

            newGalleryImages.push(galleryUrl);
          }

          // Delay
          await new Promise((r) => setTimeout(r, 300));
        }
      }

      // =========================
      // SAVE UPDATED PRODUCT
      // =========================
      updatedProducts.push({
        ...product,
        image_url: newImageUrl,
        gallery_images: newGalleryImages,
      });

      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error("Failed to process product:", product.title);

      updatedProducts.push(product);
    }
  }

  // =========================
  // SAVE JSON
  // =========================
  const outputPath = path.join(
    __dirname,
    "../src/data/products-cloudinary.json",
  );

  fs.writeFileSync(outputPath, JSON.stringify(updatedProducts, null, 2));

  console.log("✅ All products processed successfully!");
}
main();
