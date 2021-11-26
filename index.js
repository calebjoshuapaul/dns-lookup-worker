import * as dns from "dns";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let reqUrl = new URL(request.url);
  let url = reqUrl.searchParams.get("url");

  const options = {
    family: 6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  };
  let result = dns.lookup(url, options, (err, address, family) => {
    return `address: ${address} family: IPv${family}`;
  });

  return new Response(result, {
    headers: { "content-type": "text/plain" },
  });
}
