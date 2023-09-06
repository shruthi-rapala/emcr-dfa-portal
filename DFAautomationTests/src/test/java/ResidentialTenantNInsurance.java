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

import static dfa.WebDriverManager.getDriver;

public class ResidentialTenantNInsurance {

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

        Login login = new Login();
        login.test();

        Thread.sleep(4000);
        CreateNewApplicationHomeowner createAp = new CreateNewApplicationHomeowner();
        createAp.createAppl(element, driverWait, driver);

        //TO DO - Profile verification
        Thread.sleep(1000);

        //Homeowner
        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='ResidentialTenant']")));
        js1.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='No']")));
        js2.executeScript("arguments[0].click();", element);

        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'I/We declare that we carry no insurance (no fire, theft or liability) on the property listed on this')]")));

       element = driverWait.until(ExpectedConditions
                .presenceOfElementLocated(By.id("mat-input-0")));
        element.sendKeys("Test Test");
/*        element = driverWait.until(ExpectedConditions
                .presenceOfElementLocated(By.id("mat-input-1")));
        element.sendKeys("12/12/2024");*/

        Thread.sleep(1000);
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.id("canvas")));
        element.click();

        Thread.sleep(2000);
        JavascriptExecutor js3 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Damaged Property ')]")));
        js3.executeScript("arguments[0].click();", element);
        Thread.sleep(1500);

        //Dsiclaimer
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Yes, I have selected the correct')]")));
        element.click();
        //Select Yes
//        JavascriptExecutor js4 = (JavascriptExecutor) driver;
//        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/mat-radio-button[1]/label/span[1]/span[1]")));
//        js4.executeScript("arguments[0].click();", element);
//        Thread.sleep(1000);

        //Select No
        Thread.sleep(4000);
        JavascriptExecutor js100 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/mat-radio-button[2]/label/span[1]/span[1]")));
        js100.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js5 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[1]/div[1]/mat-form-field/div/div[1]/div[3]/input")));
        js5.executeScript("arguments[0].scrollIntoView(true);", element);
        element.sendKeys("3220 Test");
        Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[3]/div/mat-form-field/div/div[1]/div[3]/input")));
        element.sendKeys("Victoria");
        //Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[1]/div/mat-radio-group/div[2]/app-bc-address/div/div[5]/div/mat-form-field/div/div[1]/div[3]/input")));
        element.sendKeys("V8X1G3");

        //Questions
        Thread.sleep(2000);
        JavascriptExecutor js22 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[2]/div/mat-radio-group/mat-radio-button[1]/label/span[1]/input")));
        js22.executeScript("arguments[0].click();", element);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[3]/div/mat-radio-group/mat-radio-button[1]/label/span[1]/input")));
        js.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[4]/div/mat-form-field/div/div[1]/div[3]/input")));
        element.sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m");
        Thread.sleep(1000);
        //Is your home a manufactured home?
        JavascriptExecutor js21 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[5]/div/mat-radio-group/mat-radio-button[1]/label/span[1]/input")));
        js21.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js41 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[6]/div[1]/mat-form-field/div/div[1]/div[3]/input")));
        js41.executeScript("arguments[0].click();", element);
        element.sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscin");
        JavascriptExecutor js42 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[6]/div[2]/mat-form-field/div/div[1]/div[3]/input")));
        js42.executeScript("arguments[0].click();", element);
        element.sendKeys("Lorem ipsum dolor sit amet, consectetuer adipiscin");
        JavascriptExecutor js43 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[6]/div[3]/mat-form-field/div/div[1]/div[3]/input")));
        js43.executeScript("arguments[0].click();", element);
        element.sendKeys("999-999-9999");
        JavascriptExecutor js44 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-component-wrapper/app-damaged-property-address/mat-card/mat-card-content/form/div[6]/div[4]/mat-form-field/div/div[1]/div[3]/input")));
        js44.executeScript("arguments[0].click();", element);
        element.sendKeys("Test123TEST@test.com");
        Thread.sleep(1000);
        JavascriptExecutor js31 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Cause of Damage ')]")));
        js31.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        HomeOwnerApplicationDetails damageAppl = new HomeOwnerApplicationDetails();
        damageAppl.damage(element, driverWait, driver);

        JavascriptExecutor js6= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Occupants ')]")));
        js6.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //add full time occupant
        HomeOwnerApplicationDetails ocupantsAppl = new HomeOwnerApplicationDetails();
        ocupantsAppl.ocupants(element, driverWait, driver);

        JavascriptExecutor js7= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Clean Up Log ')]")));
        js7.executeScript("arguments[0].click();", element);

        //CleanUp logs
        HomeOwnerApplicationDetails clean = new HomeOwnerApplicationDetails();
        clean.cleanLogs(element, driverWait, driver);

        JavascriptExecutor js37= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Supporting Documents ')]")));
        js37.executeScript("arguments[0].click();", element);

        //Supporting docs
//        HomeOwnerApplicationDetails supDocs = new HomeOwnerApplicationDetails();
//        supDocs.docs(element, driverWait, driver);
        //Add insurance template
        Thread.sleep(2000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Insurance Template ')]")));
        element.click();

        Thread.sleep(1000);
        WebElement uploadInsur = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("fileDrop")));
        uploadInsur.sendKeys(System.getProperty("user.dir") + '/' + "dummy.pdf");

        //Save
        JavascriptExecutor js38= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[6]/app-component-wrapper/app-supporting-documents/mat-card/mat-card-content/div[3]/div/app-dfa-attachment/form/div/mat-card/div[2]/div[2]/button")));
        js38.executeScript("arguments[0].click();", element);
        Thread.sleep(2000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Rental Agreement ')]")));
        element.click();

        Thread.sleep(1000);
        WebElement uploadRent = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("fileDrop")));
        uploadRent.sendKeys(System.getProperty("user.dir") + '/' + "testDFA.xlsx");

        //Save
        JavascriptExecutor js381= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[6]/app-component-wrapper/app-supporting-documents/mat-card/mat-card-content/div[4]/div/app-dfa-attachment/form/div/mat-card/div[2]/div[2]/button/span[1]")));
        js381.executeScript("arguments[0].click();", element);

        Thread.sleep(2000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Identification ')]")));
        element.click();

        Thread.sleep(1000);
        WebElement uploadIdentif = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("fileDrop")));
        uploadIdentif.sendKeys(System.getProperty("user.dir") + '/' + "testPPXDFA.pptx");

        //Save
        Thread.sleep(1000);
        JavascriptExecutor js382= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[6]/app-component-wrapper/app-supporting-documents/mat-card/mat-card-content/div[5]/div/app-dfa-attachment/form/div/mat-card/div[2]/div[2]/button")));
        js382.executeScript("arguments[0].click();", element);
        Thread.sleep(2000);
        JavascriptExecutor js39= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Review Submission ')]")));
        js39.executeScript("arguments[0].click();", element);

        //Sign and Submit
        HomeOwnerApplicationDetails signSubmit = new HomeOwnerApplicationDetails();
        signSubmit.submit(element, driverWait, driver);


    }
}
