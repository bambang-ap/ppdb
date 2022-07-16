/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  getServerSideProps: false,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
