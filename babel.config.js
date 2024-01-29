module.exports = {
  presets: [
    // Your existing presets
    // e.g., '@babel/preset-env', '@babel/preset-react'
  ],
  plugins: [
    // Your existing plugins
    // Add the nullish coalescing operator plugin
    "@babel/plugin-proposal-nullish-coalescing-operator",
  ],
};
