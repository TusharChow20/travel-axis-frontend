import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "@/components/shared/AuthProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Provider store={store}>
          <AuthProvider>{children}</AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
