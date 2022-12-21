module.exports = function (testURL, refURL) {
  return [
    {
      label: 'Home',
      url: `${testURL}`,
      referenceUrl:`${refURL}`,
    },
    {
      label: 'About',
      url: `${testURL}about/`,
      referenceUrl:`${refURL}about/`,
    },
  ];
}
