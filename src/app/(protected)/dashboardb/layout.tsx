

export default async function DashboardBLayout({children,}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body>
        <header>Hye</header>
        <main>{children}</main>
       <footer className="text-center">Hi</footer>
      </body>
    </html>
  )
}