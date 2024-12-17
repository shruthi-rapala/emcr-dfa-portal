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

import java.time.Duration;
import java.util.Iterator;
import java.util.Set;

import static dfa.CustomWebDriverManager.getDriver;

public class HomeOwnerWithnsurance {

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
        Thread.sleep(4000);
        CreateNewApplicationHomeownerNoInsurance createAp = new CreateNewApplicationHomeownerNoInsurance();
        createAp.createAppl(element, driverWait, driver);

        //TO DO - Profile verification
        Thread.sleep(1000);

        //Homeowner
        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='Homeowner']")));
        js1.executeScript("arguments[0].click();", element);

        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='Yes']")));
        js2.executeScript("arguments[0].click();", element);
        //Yes, cancel my app
        // Switch to pop-up window
        String parentWindowHandler = driver.getWindowHandle(); // Store your parent window
        String subWindowHandler = null;

        Set<String> handles = driver.getWindowHandles(); // get all window handles
        Iterator<String> iterator = handles.iterator();
        while (iterator.hasNext()) {
            subWindowHandler = iterator.next();
        }
        driver.switchTo().window(subWindowHandler); // switch to popup window
        System.out.println("switched");
        Thread.sleep(1000);
        JavascriptExecutor js11 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"mat-dialog-0\"]/app-dfa-eligibility-dialog/mat-dialog-actions/div[1]/button/span[1]")));
        js11.executeScript("arguments[0].click();", element);
        System.out.println("Don't Continue in pop-up clicked");

        driver.switchTo().window(parentWindowHandler); // switch back to parent window
        Thread.sleep(1000);

        new WebDriverWait(driver, Duration.ofSeconds(30)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Create New Application ')]")));

    }
    }
