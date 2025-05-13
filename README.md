# LogChunk

A Node.js package that adds color to your console logs, improving readability and making log outputs more vibrant.

This package helps you save your logs to a separate file and write colored log messages. I tried to make it as easy as possible, and I believe it will help your project! 🙂

## Installation
```bash
npm install logchunk
```

## Usage
You can use it as a module:
```js
import LogChunk from 'logchunk';

const log = new LogChunk({
    /* The logFile variable is the path where the console log is saved. */
    logFile: "log.txt"
});

const color = LogChunk.Colors;
const type = LogChunk.Warning;

log.makeLogMessage(type.ERROR, "This is an error message");
log.customLogMessage(color.RED, "error", "This is an error message");
```

---

```js
LogChunk.makeLogMessage(type, message)
```
Create a simple and fast log message.

| Parameter | Type   | Description                                 |
|-----------|--------|---------------------------------------------|
| `type`    | String | The type of log message.                    |
| `message` | String | The message to log.                         |
| **Returns** | String | The colored log message displayed in the Node.js console. |

Available types for `makeLogMessage()`:

| Type      | Color |
|-----------|--------|
| WARN      | 🟨     |
| INFO      | 🟦     |
| ERROR     | 🟥     |
| DEBUG     | 🟩     |
| CRITICAL  | 🟥     |

You can use them like `LogChunk.Warning.WARN`. The `Warning` is an object.

---

```js
LogChunk.customLogMessage(color, type, message)
```
Create a custom log message.

| Parameter | Type   | Description                                     |
|-----------|--------|-------------------------------------------------|
| `color`   | String | The color function from `LogChunk.Colors`.      |
| `type`    | String | The type of log message.                        |
| `message` | String | The message to log.                             |
| **Returns** | String | The colored log message displayed in the Node.js console. |

Available colors:  
`RED`, `GREEN`, `YELLOW`, `BLUE`, `MAGENTA`, `CYAN`, `WHITE`, `GRAY`, `GREY`

This package uses the [`chalk`](https://www.npmjs.com/package/chalk) package under the hood.

---

### License
MIT
### Author
Sabolch - [Github profile](https://github.com/SaboIch)