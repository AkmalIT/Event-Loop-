//Event loop 

// -- What is it Event Loop 


// --The event loop in Node.js is a mechanism that allows you to perform asynchronous operations and handle events in a single-threaded JavaScript environment. It allows Node.js to perform input/output (I/O) operations without blocking the main thread, making applications more efficient and scalable.

// --The event loop consists of several phases that operate in trigger mode. Let's look at each phase in more detail and provide code examples for each of them.


// -------------------------------------------------------------------------------------------------------------

// 1. Timers 

// * In this phase, callbacks scheduled using the setTimeout() and setInterval() functions are executed.
// * Example code:

    setTimeout(() => {
        console.log("Timeout callback");
    })

// * Example code :
    console.log('1');
    setTimeout(() => {
        console.log('2');
    }, 2000);
    console.log('3');

// ---------------------------------------------------------------------------------------------------------------

// 2. Pending callbacks

// * In this phase, deferred callbacks, such as TCP error callbacks, are executed.
// * Example code:

    const fs = require("fs")

    fs.readFile('/path/to/file', (err, data) => {
        if(err){
            console.error("Error:", err);
        }else{
            console.log("File Data: ", data);
        }
    })

// * Example code:
    console.log('1');
    fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
        console.log(data);
    });
    console.log('3');

// -----------------------------------------------------------------------------------------------------------

//3. Poll 

// * In this phase, input/output (I/O) events are polled and the associated callbacks are executed.
// * Example code:

    const http = require("http")

    const server = http.createServer((req, res) => {
        res.end("Hello NodeJs")
    })

    server.listen(3000, () => console.log(`Server started on port ${3000}`))

// * Example code: 
    console.log('1');
    http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
    }).listen(3000);
    console.log('3');

// ------------------------------------------------------------------------------------------------------------

//4. Check

// * In this phase, callbacks scheduled using the setImmediate() function are executed.
// * Example code: 

    setImmediate(() => {
        console.log("Immediate Callback");
    })

// * Example code:

    console.log('1');
    setImmediate(() => {
    console.log('2');
    });
    console.log('3');

// -------------------------------------------------------------------------------------------------------

//5. Close callbacks 

// * In this phase, callbacks related to closing connections or error handling are executed.
// * Example code: 

    const server2 = http.createServer((req, res) => {
        // ...
    })

    server.on("close", () => { 
        console.log("Server Closed");
    })

// * Example code:

fs.writeFile('example.txt', 'Hello, World!', (err) => {
    if (err) throw err;
    console.log('File created');
  
    fs.close(fs.openSync('example.txt', 'r'), (err) => {
      if (err) throw err;
      console.log('File closed');
    });
  });

  function closeCallback() {
    console.log('Close callback executed');
  }
  
  process.on('close', closeCallback);

// --------------------------------------------------------------------------------------------------------------

// The event loop in Node.js is built on top of the libuv library, which provides a managed event-driven non-blocking I/O model. The event loop is responsible for managing and executing callbacks and events in a single-threaded environment.

// Here is a detailed explanation of how the event loop works in Node.js:

// Initialization: When Node.js starts up, it initializes the event loop and processes the input script or enters the REPL (Read-Eval-Print Loop).

// Order of operations: The event loop follows a specific order of operations:

// a. The event loop starts with the timers phase, where it executes callbacks scheduled by timers.

// b. It then moves to the pending callbacks phase, where it executes I/O callbacks that were deferred from the previous cycle.

// c. Next, the event loop enters the polling phase. If there are any callbacks in the poll queue, it will iterate through them and execute them synchronously. If the poll queue is empty, the event loop will wait for new callbacks to be added or move to the next phase if setImmediate() callbacks are scheduled.

// d. After the polling phase, the event loop enters the check phase, where it executes setImmediate() callbacks.

// e. Finally, the event loop moves to the close callbacks phase, where it executes close callbacks.

// Execution of a callback: The event loop executes callbacks from the event queue only when the call stack is empty, i.e., there are no current tasks. This allows Node.js to efficiently handle asynchronous operations by offloading them to the system core whenever possible.