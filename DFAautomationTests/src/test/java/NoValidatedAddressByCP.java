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

import static dfa.CustomWebDriverManager.getDriver;

public class NoValidatedAddressByCP {

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

        Thread.sleep(2000);
        CreateNewApplicationHomeownerNoInsurance createAp = new CreateNewApplicationHomeownerNoInsurance();
        createAp.createAppl(element, driverWait, driver);

        //TO DO - Profile verification
        Thread.sleep(1000);

        //Homeowner
        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='Homeowner']")));
        js1.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='Unsure']")));
        js2.executeScript("arguments[0].click();", element);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'To qualify for DFA you must have occupied the property as your principal residence')]")));

        //What is the damaged property address?
        JavascriptExecutor js12 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Same as my profile address')]")));
        js12.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        JavascriptExecutor js13 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-prescreening/div/app-component-wrapper/prescreening/mat-card/mat-card-content/form/div[2]/div/mat-form-field[1]/div/div[1]/div[4]/mat-datepicker-toggle/button")));
        js13.executeScript("arguments[0].click();", element);

        JavascriptExecutor js14 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/div[2]/div[2]/div/mat-datepicker-content/div[2]/mat-calendar/div/mat-month-view/table/tbody/tr[1]/td[3]/button/div[1]")));
        js14.executeScript("arguments[0].click();", element);

        JavascriptExecutor js15 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Matching Disaster Event')]")));
        js15.executeScript("arguments[0].click();", element);

        JavascriptExecutor js16 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"mat-option-0\"]/span")));
        js16.executeScript("arguments[0].click();", element);

        JavascriptExecutor js17 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"mat-radio-3\"]/label/span[1]/span[1]")));
        js17.executeScript("arguments[0].click();", element);

        JavascriptExecutor js18 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"mat-radio-6\"]/label/span[1]/span[1]")));
        js18.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        JavascriptExecutor js3 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Submit Answers ')]")));
        js3.executeScript("arguments[0].click();", element);

        JavascriptExecutor js31 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Yes, I want to apply now ')]")));
        js31.executeScript("arguments[0].click();", element);

        //Notice
        Thread.sleep(1000);
        JavascriptExecutor js32 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Verify Your Profile ')]")));
        js32.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js36 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-start/div/mat-horizontal-stepper/div/div[2]/div[2]/app-component-wrapper/app-profile-verification/mat-card/mat-card-content/form/mat-card-content[3]/div[2]/mat-radio-group/mat-radio-button[1]/label/span[1]/span[1]")));
        js36.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js35 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-start/div/mat-horizontal-stepper/div/div[2]/div[2]/app-component-wrapper/app-profile-verification/mat-card/mat-card-content/form/mat-card-content[5]/div[2]/div[2]/div[2]/mat-form-field/div/div[1]/div[3]/input")));
        js35.executeScript("arguments[0].click();", element);
        js35.executeScript("arguments[0].value='test@test.com'", element);
        element.clear();
        element.sendKeys("test@test.com");
        JavascriptExecutor js33 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Application Type ')]")));
        js33.executeScript("arguments[0].click();", element);

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(), 'Select an application type')]")));

        //Create Homeowner appl
        JavascriptExecutor js39 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.id("canvas")));
        js39.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        ((JavascriptExecutor) driver)
                .executeScript("window.scrollTo(0, document.body.scrollHeight)");

        Thread.sleep(1000);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(), ' Next - Damaged Property ')]"))).click();

        Thread.sleep(1000);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(), ' Yes, I have selected the correct')]"))).click();

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(), ' 123 FIRST STREET')]")));

        //Select No
        Thread.sleep(1000);
        JavascriptExecutor js100 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/mat-radio-button[2]/label/span[1]/span[1]")));
        js100.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js101 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")));
        js101.executeScript("arguments[0].scrollIntoView(true);", element);
        element.sendKeys("123 ABC");
        Thread.sleep(1000);
/*        JavascriptExecutor js110 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' 3220 Quadra St, Victoria, BC, V8X 1G3 ')]")));
        js110.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);*/
        JavascriptExecutor js102 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[3]/div/mat-form-field/div/div[1]/div[3]/input")));
        js102.executeScript("arguments[0].scrollIntoView(true);", element);
        element.sendKeys("Test City");
        JavascriptExecutor js103 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[5]/div/mat-form-field/div/div[1]/div[3]/input")));
        js103.executeScript("arguments[0].scrollIntoView(true);", element);
        element.sendKeys("V8V 8V8");

        //Questions

        HomeOwnerApplicationDetails questions = new HomeOwnerApplicationDetails();
        questions.questionsOnDamaga(element, driverWait, driver);

        //Go Review page and check the address no validated
        Thread.sleep(1000);
       JavascriptExecutor js110 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Review')]")));
        js110.executeScript("arguments[0].click();", element);

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(), 'Test City ')]")));

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(), '123 ABC')]")));


    }
}
