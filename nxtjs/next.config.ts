import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  /* use export output to /dist for production static files generation */
  output: 'export',
};


// // allow any domain to access development server 
// module.exports = {
//   allowedDevOrigins: ['local.test'], /// dnsmasq local.test
// }


export default nextConfig;
