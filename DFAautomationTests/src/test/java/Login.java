import dfa.CommonUtils;
import dfa.WebDriverManager;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class Login {

    private WebDriver driver;
    private static String  bceidUSERNAME = System.getenv("USERNAME_BCEID");
    private static String bceidPASSWORD = System.getenv("PASSWORD_BCEID");


//    @After
//    public void tearDown() {
//        driver.close();
//        driver.quit();
//    }
//    @AfterClass
//    public static void afterClass() {
//        WebDriverManager.instance = null;
//    }


    @Test
    public void test() throws Exception {
        driver = WebDriverManager.getDriver();
        WebDriverWait driverWait = WebDriverManager.getDriverWait();
        WebElement element = WebDriverManager.getElement();
        WebDriverManager.getElements();

        CommonUtils.login();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions
                .presenceOfElementLocated(By.xpath("//*[contains(text(), ' Log in with BC Services Card ')]")));
        js.executeScript("arguments[0].click();", element);
        element = driverWait.until(ExpectedConditions
                .presenceOfElementLocated(By.xpath("//*[contains(text(), 'Virtual testing')]")));
        element.click();

        //To be added as sys variables
        Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("csn")));
        element.sendKeys(bceidUSERNAME);
        //Continue
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("continue")));
        element.click();
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("passcode")));
        element.sendKeys(bceidPASSWORD);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("btnSubmit")));
        element.click();

        //Display notice of Collention
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Notice of Collection ')]")));

        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions
                .presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next ')]")));
        js1.executeScript("arguments[0].click();", element);
    }
}
