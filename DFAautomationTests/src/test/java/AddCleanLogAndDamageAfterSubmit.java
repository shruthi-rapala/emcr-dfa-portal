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

public class AddCleanLogAndDamageAfterSubmit {

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

        HomeOwnerApplicationDetails addLogsAndDamaga = new HomeOwnerApplicationDetails();
        addLogsAndDamaga.test();
        Thread.sleep(1000);

        //Go to Clean up logs page
        JavascriptExecutor js162= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[1]/mat-step-header[4]/div[2]")));
        js162.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js16= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add to clean up log ')]")));
        js16.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js17= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")));
        js17.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("7/6/2023");
        Thread.sleep(1000);
        JavascriptExecutor js18= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/input")));
        js18.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Lorem ipsum dolor");
        Thread.sleep(1000);
        JavascriptExecutor js19= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[3]/mat-form-field/div/div[1]/div[3]/input")));
        js19.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[3]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("100");
        Thread.sleep(1000);
        JavascriptExecutor js191= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[4]/mat-form-field/div/div[1]/div[3]/input")));
        js191.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[4]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m");
        Thread.sleep(1000);
        JavascriptExecutor js20= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".addcleanup-button:nth-child(1) > .mat-button-wrapper")));
        js20.executeScript("arguments[0].click();", element);

        //Damage Items by room
        JavascriptExecutor js163= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[1]/mat-step-header[5]/div[2]")));
        js163.executeScript("arguments[0].click();", element);
        JavascriptExecutor js32= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Room & Items ')]")));
        js32.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        JavascriptExecutor js35= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[5]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[1]/mat-form-field[1]/div/div[1]/div[3]/mat-select/div/div[1]")));
        js35.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Dining room')]")));
        element.click();
        Thread.sleep(1000);

        JavascriptExecutor js33= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[5]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/textarea")));
        js33.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[5]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/textarea")).sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu");
        JavascriptExecutor js321= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Save ')]")));
        js321.executeScript("arguments[0].click();", element);
    }
}
