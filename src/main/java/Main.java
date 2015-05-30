import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.NetworkListener;
import org.glassfish.grizzly.http.server.StaticHttpHandler;

import java.io.IOException;

/**
 * Created by havardottestad on 30/05/15.
 */
public class Main {

      public static void main(String[] args) throws InterruptedException {
            HttpServer server = new HttpServer();
            server.addListener(new NetworkListener("sample-listener1", "localhost", 8080));

            StaticHttpHandler web = new StaticHttpHandler("./src/main/js/");
            web.setFileCacheEnabled(false);
            server.getServerConfiguration().addHttpHandler(web);


            try {
                  server.start();
            } catch (IOException e) {
                  e.printStackTrace();
            }

            while(true){
                  Thread.sleep(3000);

            }
      }

}
