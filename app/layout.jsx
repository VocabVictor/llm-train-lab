import "./globals.css";

export const metadata = {
  title: "llm-train-lab",
  description: "Interactive learning lab for training-engineering beginners"
};

export default function RootLayout({children}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
