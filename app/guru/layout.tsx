import Header from "@/app/components/headeradmin";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] md:mt-20 mx-auto">{children}</main>
    </>
  );
};

export default layout;
