import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}; 