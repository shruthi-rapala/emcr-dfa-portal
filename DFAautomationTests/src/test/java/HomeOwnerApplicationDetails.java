import dfa.WebDriverManager;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static dfa.WebDriverManager.getDriver;
import static java.awt.SystemColor.window;

public class HomeOwnerApplicationDetails {

    private WebDriver driver;


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
        driver = getDriver();
        WebDriverWait driverWait = WebDriverManager.getDriverWait();
        WebElement element = WebDriverManager.getElement();
        WebDriverManager.getElements();

        CreateNewApplicationHomeowner applDetails = new CreateNewApplicationHomeowner();
        applDetails.test();
        Thread.sleep(1000);
        JavascriptExecutor js100 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-13-input")));
        js100.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js5 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-4")));
        js5.executeScript("arguments[0].scrollIntoView(true);", element);
        element.sendKeys("3220 Test");

        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-6")));
        element.sendKeys("Victoria");
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-8")));
        element.sendKeys("V8X1G3");

        //Questions
        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-15-input")));
        js2.executeScript("arguments[0].click();", element);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-18-input")));
        js.executeScript("arguments[0].click();", element);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-16")));
        element.sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m");
        Thread.sleep(1000);
        //Is your home a manufactured home?
        JavascriptExecutor js21 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-radio-22 .mat-radio-outer-circle")));
        js21.executeScript("arguments[0].click();", element);
        //As the Home Owner, are you eligible for a BC Home Owner Grant for this property?
        JavascriptExecutor js3 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-radio-24 .mat-radio-outer-circle")));
        js3.executeScript("arguments[0].click();", element);
        JavascriptExecutor js31 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Cause of Damage ')]")));
        js31.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        JavascriptExecutor js311 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-checkbox-1 .mat-checkbox-inner-container")));
        js311.executeScript("arguments[0].click();", element);
        JavascriptExecutor js312 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-checkbox-2 .mat-checkbox-inner-container")));
        js312.executeScript("arguments[0].click();", element);
        JavascriptExecutor js313 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-checkbox-3 .mat-checkbox-inner-container")));
        js313.executeScript("arguments[0].click();", element);
        JavascriptExecutor js314 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-checkbox-4 .mat-checkbox-inner-container")));
        js314.executeScript("arguments[0].click();", element);
        JavascriptExecutor js315 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#mat-checkbox-5 .mat-checkbox-inner-container")));
        js315.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        JavascriptExecutor js316 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-9")));
        js316.executeScript("arguments[0].click();", element);
        element.sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu");

        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-10")));
        element.sendKeys("7/5/2023");

        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-11")));
        element.sendKeys("7/27/2023");

        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-12")));
        element.sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestib");
        Thread.sleep(1000);
        //Excluding luxury/non-essential items and landscaping, do your losses total more than $1,000?
        JavascriptExecutor js22 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-27-input")));
        js22.executeScript("arguments[0].click();", element);

        //Were you evacuated during the event?
        JavascriptExecutor js23 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-30-input")));
        js23.executeScript("arguments[0].click();", element);
        //date return
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-17")));
        element.sendKeys("7/28/2023");
        //reside in
        JavascriptExecutor js4 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-radio-33-input")));
        js4.executeScript("arguments[0].click();", element);

        JavascriptExecutor js6= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Occupants ')]")));
        js6.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        //add full time occupant
        JavascriptExecutor js61= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add full-time occupant ')]")));
        js61.executeScript("arguments[0].click();", element);

        JavascriptExecutor js8= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-18")));
        js8.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-18")).sendKeys("Lorem ipsum dolor si");

        JavascriptExecutor js9= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-19")));
        js9.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-19")).sendKeys("Lorem ipsum dolor si");

        JavascriptExecutor js10= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-20")));
        js10.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-20")).sendKeys("Lorem ipsum dolor si");

        JavascriptExecutor js11= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"cdk-step-content-1-2\"]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[2]/div[2]/button/span[1]")));
        js11.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //Add other contact
        JavascriptExecutor js41= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add other contact ')]")));
        js41.executeScript("arguments[0].click();", element);

        JavascriptExecutor js12= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-21")));
        js12.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-21")).sendKeys("Lorem ipsum dolor si");

        JavascriptExecutor js13= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-22")));
        js13.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-22")).sendKeys("Lorem ipsum dolor si");

        JavascriptExecutor js14= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-23")));
        js14.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-23")).sendKeys("999-999-9999");

        JavascriptExecutor js15= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-24")));
        js15.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-24")).sendKeys("test@test.com");

        //Save
        JavascriptExecutor js40= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"cdk-step-content-1-2\"]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[2]/div[2]/button")));
        js40.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        JavascriptExecutor js7= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Clean Up Log ')]")));
        js7.executeScript("arguments[0].click();", element);

        //CleanUp logs
        JavascriptExecutor js16= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add to clean up log ')]")));
        js16.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js17= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-25")));
        js17.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-25")).sendKeys("7/5/2023");

        JavascriptExecutor js18= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-26")));
        js18.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-26")).sendKeys("Lorem ipsum dolor si");

        JavascriptExecutor js19= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-27")));
        js19.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-27")).sendKeys("20");

        JavascriptExecutor js20= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".addcleanup-button:nth-child(1) > .mat-button-wrapper")));
        js20.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        JavascriptExecutor js30= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Damaged Items By Room ')]")));
        js30.executeScript("arguments[0].click();", element);

        //Damaged Items by Room
        JavascriptExecutor js32= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Room & Items ')]")));
        js32.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        JavascriptExecutor js35= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-select-0")));
        js35.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Bathroom')]")));
        element.click();
        Thread.sleep(1000);

        JavascriptExecutor js33= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-input-29")));
        js33.executeScript("arguments[0].click();", element);
        driver.findElement(By.id("mat-input-29")).sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu");

        JavascriptExecutor js34= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"cdk-step-content-1-4\"]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[2]/div[2]/button")));
        js34.executeScript("arguments[0].click();", element);

        //add photo
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Photos ')]")));
        element.click();

        Thread.sleep(1000);
        WebElement upload = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("fileDrop")));
        upload.sendKeys(System.getProperty("user.dir") + '/' + "NewTicket.png");

        //Save
        JavascriptExecutor js36= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"cdk-step-content-1-4\"]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form[2]/div/div/div/mat-card/div[2]/div[2]/button")));
        js36.executeScript("arguments[0].click();", element);

        JavascriptExecutor js37= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Supporting Documents ')]")));
        js37.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        WebElement uploadInsur = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("fileDrop")));
        uploadInsur.sendKeys(System.getProperty("user.dir") + '/' + "dummy.pdf");

        //Save
        JavascriptExecutor js38= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"cdk-step-content-1-5\"]/app-component-wrapper/app-supporting-documents/mat-card/mat-card-content/form[1]/div/mat-card/div[2]/div/button")));
        js38.executeScript("arguments[0].click();", element);

        JavascriptExecutor js39= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Review Submission ')]")));
        js39.executeScript("arguments[0].click();", element);

        //Sign and Submit
        JavascriptExecutor js42= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Sign & Submit ')]")));
        js42.executeScript("arguments[0].click();", element);

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Declaration')]")));
        Thread.sleep(1000);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.id("canvas"))).click();
        JavascriptExecutor js50= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[8]/app-component-wrapper/app-sign-and-submit/mat-card/mat-card-content/form/div[2]/div[1]/app-signature/div/div[2]/div/mat-form-field/div/div[1]/div[3]/input")));
        js50.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[8]/app-component-wrapper/app-sign-and-submit/mat-card/mat-card-content/form/div[2]/div[1]/app-signature/div/div[2]/div/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Lorem ipsum dolor si");
        JavascriptExecutor js51= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[8]/app-component-wrapper/app-sign-and-submit/mat-card/mat-card-content/form/div[2]/div[1]/app-signature/div/div[3]/div/mat-form-field/div/div[1]/div[3]/input")));
        js51.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[8]/app-component-wrapper/app-sign-and-submit/mat-card/mat-card-content/form/div[2]/div[1]/app-signature/div/div[3]/div/mat-form-field/div/div[1]/div[3]/input")).sendKeys("7/31/2023");
        Thread.sleep(1000);
        js.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        Thread.sleep(1000);
        JavascriptExecutor js52= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"cdk-step-content-1-7\"]/div/div[2]/button/span[1]")));
        js52.executeScript("arguments[0].click();", element);

    }
}
