import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '../hooks/use-toast';

interface ToastMessage {
  text: string;
  link?: {
    url: string;
    label?: string;
  };
}

type ToastInput = string | ToastMessage;

export const ToastContent = ({ message }: { message: ToastMessage }) => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <span>{message?.text}</span>
      {message?.link && (
        <a
          className="text-blue-500 border-b border-blue-500 hover:border-blue-700 hover:text-blue-700 inline-block text-left cursor-pointer"
          onClick={() => router.push(message?.link!?.url)}
        >
          {message?.link?.label || message?.link?.url}
        </a>
      )}
    </div>
  );
};

const createToastContent = (message: ToastInput): React.ReactNode => {
  if (typeof message === 'string') {
    return message;
  }
  return <ToastContent message={message} />;
};

export const showToast = {
  success: (message: ToastInput, title?: string) => {
    toast({
      // title: title || 'Success',
      description: createToastContent(message),
      variant: 'default',
    });
  },

  error: (message: ToastInput, title?: string) => {
    toast({
      // title: title || 'Error',
      description: createToastContent(message),
      variant: 'destructive',
    });
  },

  info: (message: ToastInput, title?: string, duration?: number) => {
    toast({
      // title: title || 'Info',
      description: createToastContent(message),
      duration: duration || 5000,
      variant: 'default',
    });
  },

  warning: (message: ToastInput, title?: string) => {
    toast({
      // title: title || 'Warning',
      description: createToastContent(message),
      duration: 5000,
      variant: 'default',
    });
  },
};
