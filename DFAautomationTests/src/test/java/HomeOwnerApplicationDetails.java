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

import static dfa.WebDriverManager.getDriver;

public class HomeOwnerApplicationDetails {

    private WebDriver driver;


    @After
    public void tearDown() {
        driver.close();
        driver.quit();
    }
    @AfterClass
    public static void afterClass() {
        WebDriverManager.instance = null;
    }


    @Test
    public void test() throws Exception {
        driver = getDriver();
        WebDriverWait driverWait = WebDriverManager.getDriverWait();
        WebElement element = WebDriverManager.getElement();
        WebDriverManager.getElements();

        CreateNewApplicationHomeowner applDetails = new CreateNewApplicationHomeowner();
        applDetails.test();

        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-16")));
        element.sendKeys("3220 Test");
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-18")));
        element.sendKeys("Victoria");
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-20")));
        element.sendKeys("V8X1G3");

        //Questions
        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-22-input")));
        js2.executeScript("arguments[0].click();", element);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-25-input")));
        js.executeScript("arguments[0].click();", element);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-28")));
        element.sendKeys("Test");
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-28-input")));
        element.click();




    }
}
