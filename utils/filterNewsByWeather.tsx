interface Article {
  title?: string;
  description?: string;
}

export const filterNewsByWeather = (
  articles: Article[],
  temp: number,
): Article[] => {
  let keywords: string[];

  if (temp < 10) {
    keywords = ['death', 'crisis', 'loss'];
  } else if (temp > 30) {
    keywords = ['fear', 'threat', 'warning'];
  } else {
    keywords = ['win', 'joy', 'happiness', 'success'];
  }

  return articles.filter(article => {
    const title = article.title?.toLowerCase() || '';
    const description = article.description?.toLowerCase() || '';
    const content = title + ' ' + description;

    return keywords.some(keyword => content.includes(keyword));
  });
};
