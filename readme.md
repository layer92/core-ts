

# SleepAsync

Asynchronous sleep function lets you wait to resume execution, without blocking the thread.

## Usage

```
import {SleepAsync} from "sleep-async";

// elsewhere, in async code:
console.log("About to wait for 2 seconds...");
await SleepAsync(2000);
console.log("Approximately 2 seconds later, execution resumes...")

```