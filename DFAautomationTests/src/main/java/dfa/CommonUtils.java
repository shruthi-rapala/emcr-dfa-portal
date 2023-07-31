package dfa;



import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.logging.Logger;

public class CommonUtils {

    private static Logger log = Logger.getLogger("CommonUtils.class");

    public static void login() throws Exception {

        WebDriver driver = WebDriverManager.getDriver();
        WebElement element = WebDriverManager.getElement();

        if (Config.ENVIROMENT.equals(Constants.DEV)) {
            driver.get("http://localhost:5200/");
            driver.navigate().to("http://localhost:5200/");
            driver.navigate().refresh();

        } else if (Config.ENVIROMENT.equals(Constants.TST)) {
            driver.get("");
            driver.navigate().to("");
            driver.navigate().refresh();

        }
    }


}
