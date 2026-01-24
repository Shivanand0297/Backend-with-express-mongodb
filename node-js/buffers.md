### What are buffers in node.j

- A buffer is a temporary storage area for binary data.
- Node.js does not support direct binary data manipulation like c/c++ so buffers helps in handling the raw data efficiently.
- Used mostly when dealing with file streams, network data and binary protocols.

### Why do we need buffers ?

- JS string are UTF-16 encoded making direct binary data handling inefficient.
- Buffer stores binary data outside the V8 heap.
- Usefull when working with:
  - file systems (fs modules)
  - Networking (TCP, UDP, WebSockets)
  - Streams (handling chunks of data)
