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
            driver.get("https://dfa-portal-dev.apps.silver.devops.gov.bc.ca/");
            driver.navigate().to("https://dfa-portal-dev.apps.silver.devops.gov.bc.ca/");
            driver.navigate().refresh();

        } else if (Config.ENVIROMENT.equals(Constants.TST)) {
            driver.get("https://dfa-portal-test.apps.silver.devops.gov.bc.ca/");
            driver.navigate().to("https://dfa-portal-test.apps.silver.devops.gov.bc.ca/");
            driver.navigate().refresh();

        }
    }


}
