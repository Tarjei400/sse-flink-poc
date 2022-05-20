const HUB_URL = 'http://localhost:8081/.well-known/mercure'
const TOPIC_PARAM_NAME = 'topic'

export const init = topic => {
  const url = new URL(HUB_URL);
  url.searchParams.append(TOPIC_PARAM_NAME, topic);

  return new EventSource(url)
}
