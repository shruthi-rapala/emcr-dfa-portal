import dfa.WebDriverManager;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static java.awt.SystemColor.window;

public class CreateProfile {

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
        driver = WebDriverManager.getDriver();
        WebDriverWait driverWait = WebDriverManager.getDriverWait();
        WebElement element = WebDriverManager.getElement();
        WebDriverManager.getElements();

        Login login = new Login();
        login.test();

        //Check the first and last name are polled

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'EVAC')]")));
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'THREE')]")));

        JavascriptExecutor js = (JavascriptExecutor) driver;
        //Scroll down till the bottom of the page
        js.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        Thread.sleep(1500);
        element = driverWait.until(ExpectedConditions
                .presenceOfElementLocated(By.id("mat-input-2")));
        element.sendKeys("ET");

        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='Yes']")));
        js1.executeScript("arguments[0].click();", element);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Address ')]"))).click();

        //Address Check
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), '818-9025 PEARL PLACE')]")));
//        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
//                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'asfaf')]")));
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'BC')]")));
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'V3R 3H7')]")));
        //Scroll down till the bottom of the page
        Thread.sleep(1000);
        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-radio-5 .mat-radio-outer-circle")));
        js2.executeScript("arguments[0].click();", element);

        js.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        Thread.sleep(1000);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Contact Information ')]"))).click();

        //Input telephone no
        Thread.sleep(1500);
        JavascriptExecutor js5 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/app-root/div/main/div/app-verified-registration/app-profile/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-contact-info/mat-card/mat-card-content/form/div[2]/div/mat-form-field[1]/div/div[1]/div[3]/input")));
        js5.executeScript("arguments[0].scrollIntoView(true);", element);
        element.sendKeys("999-999-9999");

        js.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-verified-registration/app-profile/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-contact-info/mat-card/mat-card-content/form/div[4]/div/mat-form-field/div/div[1]/div[3]/input")));
        element.sendKeys("test@test.com");
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Review & Submit ')]"))).click();
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Review & Submit')]")));
        js.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        Thread.sleep(1000);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Save & Submit ')]"))).click();
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' No, I am not ready to apply ')]")));

        }

    }
