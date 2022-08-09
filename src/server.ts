import "./common/bootstrap";
import { initServer } from "./server/server";
import { runPixooCommand } from "./pixoo";
import { initCron } from "./server/cron";

initServer();
// initCron();
runPixooCommand();
