import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

const environment = process.env.NODE_ENV || "development";

// Define a custom format for log messages
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a logger
const logger = createLogger({
  level: "info", // Minimum level of messages to log
  format: combine(
    colorize(), // Colorize the output
    timestamp(), // Add a timestamp to each log
    customFormat // Apply the custom format
  ),
  transports: [
    new transports.Console(), // Log to the console in all environments
    // new transports.File({ filename: "combined.log" }),
  ],
});

// Add file transport only for error level and only if not in development environment
if (true || environment !== "development") {
  logger.add(new transports.File({ filename: "errors.log", level: "error" }));
}

export default logger;
