import dfa.WebDriverManager;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.awt.*;
import java.time.Duration;
import static dfa.WebDriverManager.getDriver;

public class CreateNewApplicationHomeowner {


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

        CreateProfile createProfile = new CreateProfile();
        createProfile.test();

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Yes, I want to apply now ')]"))).click();
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Notice of Collection')]")));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        Thread.sleep(1000);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Profile Verification ')]"))).click();

        //TO DO - Profile verification
        Thread.sleep(1000);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Application Type ')]"))).click();

        //Homeowner
        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='Homeowner']")));
        js1.executeScript("arguments[0].click();", element);

        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='No']")));
        js2.executeScript("arguments[0].click();", element);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'I/We declare that we carry no insurance (no fire, theft or liability) on the property listed on this')]")));

        Thread.sleep(1000);
    /*    Actions action = new Actions(driver);
        WebElement ele = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.id("canvas")));

        //Used points class to get x and y coordinates of element.
        Point point = ele.getLocation();
        int xcord = point.getX();
        System.out.println("Position of the webelement from left side is "+xcord +" pixels");
        int ycord = point.getY();
        System.out.println("Position of the webelement from top side is "+ycord +" pixels");

        js.executeScript("arguments[0].scrollIntoView();", ele);
        Thread.sleep(1000);
        action.moveToElement(ele).clickAndHold().moveByOffset(xcord, ycord).build().perform();*/

        element = driverWait.until(ExpectedConditions
                .presenceOfElementLocated(By.id("mat-input-12")));
        element.sendKeys("Test Test");
        element = driverWait.until(ExpectedConditions
                .presenceOfElementLocated(By.id("mat-input-13")));
        element.sendKeys("12/12/2024");

        Thread.sleep(1000);
        JavascriptExecutor js3 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Damaged Property ')]")));
        js3.executeScript("arguments[0].click();", element);


        }
    }
