export const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num.toString();
  };
  
  export const formatInsightText = (text: string) => {
    return text.replace(/\b\d{4,}\b/g, (match) => formatNumber(Number(match)));
  };
  