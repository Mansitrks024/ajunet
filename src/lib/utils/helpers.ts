export const helpers = {
  capitalizeFirstLetter: (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  truncateText: (text: string, length: number): string => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  },

  generateBreadcrumbs: (
    path: string
  ): Array<{ label: string; path: string }> => {
    const parts = path.split("/").filter(Boolean);
    return parts.map((part, index) => ({
      label: helpers.capitalizeFirstLetter(part.replace(/-/g, " ")),
      path: "/" + parts.slice(0, index + 1).join("/"),
    }));
  },

  extractUserName: (email: string | null): string => {
    if (!email) return "";
    return email.split("@")[0].replace(/\d+/g, "");
  },

  getCookieAlternative: (name: string): string | null => {
    if (typeof window === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  },

  removeCookie: (cookieName: string): void => {
    if (typeof window === "undefined") return;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },

  setCookie: (name: string, value: string, days: number = 30): void => {
    if (typeof window === "undefined") return;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/;`;
  },

  setCookies: (name: string, value: string, days: number = 30): void => {
    if (typeof window === "undefined") return;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    const hostname = window.location.hostname;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

    const domainAttr = isLocalhost ? "" : `; domain=.mechconnect.de`;

    document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/;${domainAttr}`;
  },

  hexToRgba: (hex: string, opacity: number): string | null => {
    if (
      !hex ||
      typeof hex !== "string" ||
      !/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex)
    ) {
      console.error("Invalid HEX color:", hex);
      return null;
    }

    let hexValue = hex.slice(1);

    if (hexValue.length === 3) {
      hexValue = hexValue
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const bigint = parseInt(hexValue, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
};
