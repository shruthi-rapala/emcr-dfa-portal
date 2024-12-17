import dfa.CustomWebDriverManager;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static dfa.CustomWebDriverManager.getDriver;

public class Logout {


    private WebDriver driver;


    @After
    public void tearDown() {
        driver.close();
        driver.quit();
    }
    @AfterClass
    public static void afterClass() {
        CustomWebDriverManager.instance = null;
    }


    @Test
    public void test() throws Exception {
        driver = getDriver();
        WebDriverWait driverWait = CustomWebDriverManager.getDriverWait();
        WebElement element = CustomWebDriverManager.getElement();
        CustomWebDriverManager.getElements();

        Login login = new Login();
        login.test();

        //Logout
        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/app-header/header/mat-toolbar/mat-toolbar-row/div/div[4]/button/span[1]/div/div[2]")));
        js1.executeScript("arguments[0].click();", element);

        //Sign out
        JavascriptExecutor js37= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Sign out ')]")));
        js37.executeScript("arguments[0].click();", element);

        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Log in with BC Services Card ')]")));

    }
}
