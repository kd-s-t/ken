import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply CORS to API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    const origin = request.headers.get("origin");
    
    // Allowed origins
    const allowedOrigins = [
      "https://ken-liard.vercel.app",
      "https://ken.vercel.app", // Add your production domain if different
      "http://localhost:3025", // Local development
      "http://localhost:3000", // Default Next.js port
    ];

    // Check if origin is allowed or if it's a same-origin request
    const isAllowedOrigin = origin && allowedOrigins.includes(origin);
    const isSameOrigin = !origin || origin === request.nextUrl.origin;

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 200 });
      
      if (isAllowedOrigin || isSameOrigin) {
        response.headers.set("Access-Control-Allow-Origin", origin || "*");
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.headers.set("Access-Control-Max-Age", "86400");
      }
      
      return response;
    }

    // Handle actual requests
    const response = NextResponse.next();
    
    if (isAllowedOrigin || isSameOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin || "*");
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};

