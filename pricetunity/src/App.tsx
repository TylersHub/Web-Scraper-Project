import { SearchForm } from "@/components/search-form";
import { ProductResults } from "@/components/product-results";
import { AIChatbot } from "@/components/ai-chatbot";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "@/components/notification-provider";

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NotificationProvider>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Product Price & Review Comparison
              </h1>
              <p className="text-muted-foreground">
                Search for products across multiple websites to find the best
                prices and reviews
              </p>
            </div>
            <SearchForm />
            <ProductResults />
          </div>
          {/* Theme Toggle Button */}
          <ThemeToggle />
          {/* Floating AI Chatbot */}
          <AIChatbot />
        </main>
      </NotificationProvider>
    </ThemeProvider>
  );
}
