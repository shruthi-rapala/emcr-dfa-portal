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

public class EditApplicationHomeownerNInsurance {

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

        HmeownerUnsureInsurance unsure = new HmeownerUnsureInsurance();
        unsure.unsureInsurance(element, driverWait, driver);

        //Next to Submit
        Thread.sleep(1000);
        JavascriptExecutor js3 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Sign & Submit ')]")));
        js3.executeScript("arguments[0].click();", element);
        Thread.sleep(1500);

        //Back to dashboard
        JavascriptExecutor js31 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Save & Back to Dashboard ')]")));
        js31.executeScript("arguments[0].click();", element);
        Thread.sleep(1500);

        //Pick application
        JavascriptExecutor jsa = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-dashboard/div/div[2]/div[2]/app-dfadashboard-application/div/div[1]/mat-card/div[4]/button")));
        jsa.executeScript("arguments[0].click();", element);

        //wait for address to be popolated

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' 123 FIRST STREET')]"))).click();

        //Questions
        Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m')]")));

        //Update address
        JavascriptExecutor js51 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")));
        js51.executeScript("arguments[0].scrollIntoView(true);", element);
        element.clear();
        element.sendKeys("999");
        Thread.sleep(1000);
        JavascriptExecutor js110 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' 9-3235 Alder St, Victoria, BC, V8X 1P3 ')]")));
        js110.executeScript("arguments[0].click();", element);
/*        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[3]/div/mat-form-field/div/div[1]/div[3]/input")));
        element.clear();
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[3]/div/mat-form-field/div/div[1]/div[3]/input")));
        element.sendKeys("Test City");
        //Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[5]/div/mat-form-field/div/div[1]/div[3]/input")));
        element.clear();
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[5]/div/mat-form-field/div/div[1]/div[3]/input")));
        element.sendKeys("V8V 1V3");*/

        Thread.sleep(1000);
        JavascriptExecutor js311 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Cause of Damage ')]")));
        js311.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //Amend Cause of damage
        JavascriptExecutor jsb = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[2]/app-component-wrapper/app-property-damage/mat-card/mat-card-content/form/div[1]/div/mat-checkbox[1]/label/span[1]")));
        jsb.executeScript("arguments[0].click();", element);
        JavascriptExecutor jsc = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[2]/app-component-wrapper/app-property-damage/mat-card/mat-card-content/form/div[1]/div/mat-checkbox[2]/label/span[1]")));
        jsc.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor jsd = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[2]/app-component-wrapper/app-property-damage/mat-card/mat-card-content/form/div[4]/div/mat-radio-group/mat-radio-button[2]/label/span[1]/span[2]")));
        jsd.executeScript("arguments[0].click();", element);
        JavascriptExecutor jse = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[2]/app-component-wrapper/app-property-damage/mat-card/mat-card-content/form/div[5]/div/mat-radio-group/mat-radio-button[2]/label/span[1]/span[2]")));
        jse.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js61= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Occupants ')]")));
        js61.executeScript("arguments[0].click();", element);

        //Delete
        Thread.sleep(1000);
        JavascriptExecutor js612= (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/table/tbody/tr/td[3]/button/span[1]/img[1]")));
        js612.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js613= (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/table/tbody/tr/td[4]/button/span[1]/img[1]")));
        js613.executeScript("arguments[0].click();", element);

        JavascriptExecutor js614= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add full-time occupant ')]")));
        js614.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js8= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")));
        js8.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Test123");
        Thread.sleep(1000);
        JavascriptExecutor js9= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/input")));
        js9.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("TestABC");
        Thread.sleep(1000);
        JavascriptExecutor js10= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[1]/div[3]/mat-form-field/div/div[1]/div[3]/input")));
        js10.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[1]/div[3]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Test BCE");
        Thread.sleep(1000);
        JavascriptExecutor js112= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[1]/div/div/div/mat-card/div[2]/div[2]/button/span[1]")));
        js112.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //Click OK
        JavascriptExecutor jsH= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' OK ')]")));
        jsH.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //Add other contact
        JavascriptExecutor js412= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add other contact ')]")));
        js412.executeScript("arguments[0].click();", element);

        JavascriptExecutor js12= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")));
        js12.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("TEST RTY");

        JavascriptExecutor js13= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/input")));
        js13.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Last Name");

        JavascriptExecutor js14= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[1]/div[3]/mat-form-field/div/div[1]/div[3]/input")));
        js14.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[1]/div[3]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("999-999-9999");

        JavascriptExecutor js15= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[1]/div[4]/mat-form-field/div/div[1]/div[3]/input")));
        js15.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[1]/div[4]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("testABC123@test.com");
        Thread.sleep(1000);
        //Save
        JavascriptExecutor js401= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[3]/app-component-wrapper/app-occupants/mat-card/mat-card-content/form[3]/div/div/div/mat-card/div[2]/div[2]/button")));
        js401.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js71= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Clean Up Log ')]")));
        js71.executeScript("arguments[0].click();", element);

        //Delete
        Thread.sleep(1000);
        JavascriptExecutor js404= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/table/tbody/tr/td[5]/button/span[1]/img[1]")));
        js404.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js3001= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Yes, delete record ')]")));
        js3001.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js16= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add to clean up log ')]")));
        js16.executeScript("arguments[0].click();", element);
        Thread.sleep(1500);
        JavascriptExecutor js17= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")));
        js17.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("7/5/2023");
        Thread.sleep(1000);
        JavascriptExecutor js18= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/input")));
        js18.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Lorem ipsum dolor si");
        Thread.sleep(1000);
        JavascriptExecutor js19= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[3]/mat-form-field/div/div[1]/div[3]/input")));
        js19.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[3]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("20");
        Thread.sleep(1000);
        JavascriptExecutor js191= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[4]/mat-form-field/div/div[1]/div[3]/input")));
        js191.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[4]/app-component-wrapper/app-clean-up-log/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[4]/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m");
        Thread.sleep(1000);
        JavascriptExecutor js20= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".addcleanup-button:nth-child(1) > .mat-button-wrapper")));
        js20.executeScript("arguments[0].click();", element);
        Thread.sleep(4000);

        JavascriptExecutor js30= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Damaged Items By Room ')]")));
        js30.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //Delete room and attachment

        JavascriptExecutor js201= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[5]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form/div/div/div/table/tbody/tr/td[3]/button[2]/span[1]/img[1]")));
        js201.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        JavascriptExecutor js202= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[5]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/div[2]/div/table/tbody/tr/td[4]/button/span[1]/img[1]")));
        js202.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //Delete
        JavascriptExecutor js301= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Yes, delete file ')]")));
        js301.executeScript("arguments[0].click();", element);

        JavascriptExecutor js32= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Room & Items ')]")));
        js32.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        JavascriptExecutor js35= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("mat-select-4")));
        js35.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Dining room')]")));
        element.click();
        Thread.sleep(1000);

        JavascriptExecutor js33= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[5]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/textarea")));
        js33.executeScript("arguments[0].click();", element);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[5]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form/div/div/div/mat-card/div[1]/div[2]/mat-form-field/div/div[1]/div[3]/textarea")).sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu");

        JavascriptExecutor js34= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[5]/app-component-wrapper/app-damaged-items-by-room/mat-card/mat-card-content/form/div/div/div/mat-card/div[2]/div[2]/button")));
        js34.executeScript("arguments[0].click();", element);

        JavascriptExecutor js371= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Supporting Documents ')]")));
        js371.executeScript("arguments[0].click();", element);

        //Delete supporting doc
        Thread.sleep(1000);
        JavascriptExecutor js341= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[6]/app-component-wrapper/app-supporting-documents/mat-card/mat-card-content/table/tbody/tr[1]/td[5]/button/span[1]/img[1]")));
        js341.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //Delete
        JavascriptExecutor js302= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Yes, delete file ')]")));
        js302.executeScript("arguments[0].click();", element);

        //Add insurance template
        Thread.sleep(2000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Insurance Template ')]")));
        element.click();

        Thread.sleep(1000);
        WebElement uploadInsur1 = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("fileDrop")));
        uploadInsur1.sendKeys(System.getProperty("user.dir") + '/' + "dummy.pdf");

        //Save
        JavascriptExecutor js382= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[6]/app-component-wrapper/app-supporting-documents/mat-card/mat-card-content/div[3]/div/app-dfa-attachment/form/div/mat-card/div[2]/div[2]/button")));
        js382.executeScript("arguments[0].click();", element);
        Thread.sleep(4000);
        JavascriptExecutor js391= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Review Submission ')]")));
        js391.executeScript("arguments[0].click();", element);

        //Sign and Submit
        JavascriptExecutor js42= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Sign & Submit ')]")));
        js42.executeScript("arguments[0].click();", element);

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Declaration')]")));
        Thread.sleep(1000);
        JavascriptExecutor jsg= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("canvas")));
        jsg.executeScript("arguments[0].click();", element);

        JavascriptExecutor js50= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[8]/app-component-wrapper/app-sign-and-submit/mat-card/mat-card-content/form/div[2]/div[1]/app-signature/div/div[2]/div/mat-form-field/div/div[1]/div[3]/input")));
        js50.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[8]/app-component-wrapper/app-sign-and-submit/mat-card/mat-card-content/form/div[2]/div[1]/app-signature/div/div[2]/div/mat-form-field/div/div[1]/div[3]/input")).sendKeys("Lorem ipsum dolor si");
        JavascriptExecutor js52= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[8]/app-component-wrapper/app-sign-and-submit/mat-card/mat-card-content/form/div[2]/div[1]/app-signature/div/div[3]/div/mat-form-field/div/div[1]/div[3]/input")));
        js52.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        JavascriptExecutor js90= (JavascriptExecutor) driver;
        js90.executeScript("window.scrollBy(0,document.body.scrollHeight)");
        Thread.sleep(1000);
        JavascriptExecutor js521= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"cdk-step-content-2-7\"]/div/div[2]/button/span[1]")));
        js521.executeScript("arguments[0].click();", element);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Yes, I want to submit my application. ')]"))).click();
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Your application has been submitted.')]")));

    }

}
