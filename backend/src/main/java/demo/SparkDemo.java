package demo;

import static spark.Spark.*;

public class SparkDemo {
  public static void main(String[] args) {
    port(1235);
    // 2 way communication
    webSocket("/ws", WebSocketHandler.class); // open socket and leave it open
    get("/hello", (req, res) -> "hi"); // test
  }
}
