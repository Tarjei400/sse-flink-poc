console.log("INIT JS")

const MERCURE_HUB_URL = 'http://localhost:8081/.well-known/mercure'
const FRONT_TOPIC = 'front'
const TOPIC_PARAM_NAME = 'topic'

const sseInit = () => {
  const url = new URL(MERCURE_HUB_URL);
  url.searchParams.append(TOPIC_PARAM_NAME, FRONT_TOPIC);

  const eventSource = new EventSource(url)
  eventSource.addEventListener('event1', event => console.log("event1", event))
  eventSource.addEventListener('event2', event => console.log("event2", event))
}

sseInit()
