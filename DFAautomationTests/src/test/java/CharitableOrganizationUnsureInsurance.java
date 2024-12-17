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

public class CharitableOrganizationUnsureInsurance {

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

        //Small business
        JavascriptExecutor js1 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='CharitableOrganization']")));
        js1.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        JavascriptExecutor js2 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='radio' and @value='Unsure']")));
        js2.executeScript("arguments[0].click();", element);

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
        Thread.sleep(1000);
        JavascriptExecutor js33 = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Application Type ')]")));
        js33.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);
        new WebDriverWait(driver, Duration.ofSeconds(60)).until(
                ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(), 'Select an application type')]")));
        Thread.sleep(1000);


        Thread.sleep(1000);

        JavascriptExecutor jse = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Damaged Property ')]")));
        jse.executeScript("arguments[0].click();", element);

        JavascriptExecutor jsf = (JavascriptExecutor) driver;
        element = driverWait
                .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Yes, I have selected the correct')]")));
        jsf.executeScript("arguments[0].click();", element);

        //wait for address to be popolated
        SmallBusinessNoInsurance addQuestion = new SmallBusinessNoInsurance();
        addQuestion.addressAndQuestion(element, driverWait, driver);

        JavascriptExecutor jsw = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Cause of Damage ')]")));
        jsw.executeScript("arguments[0].click();", element);

        //Damage property
        SmallBusinessNoInsurance damage = new SmallBusinessNoInsurance();
        damage.damgeProp(element, driverWait, driver);

        JavascriptExecutor js6 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Occupants ')]")));
        js6.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);

        //add occupant for business
        SmallBusinessNoInsurance ocupantsSmall = new SmallBusinessNoInsurance();
        ocupantsSmall.ocupants(element, driverWait, driver);

        JavascriptExecutor js7 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Clean Up Log ')]")));
        js7.executeScript("arguments[0].click();", element);

        //CleanUp logs
        SmallBusinessNoInsurance cleanLogSmall = new SmallBusinessNoInsurance();
        cleanLogSmall.cleanUpLogSmallBusiness(element, driverWait, driver);

        JavascriptExecutor js30 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Damaged Items By Room ')]")));
        js30.executeScript("arguments[0].click();", element);
        Thread.sleep(1000);


        //Damaged Items by Room
        SmallBusinessNoInsurance damageItem = new SmallBusinessNoInsurance();
        damageItem.damageItemRoomSmall(element, driverWait, driver);

        JavascriptExecutor js37 = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Supporting Documents ')]")));
        js37.executeScript("arguments[0].click();", element);

        //Add insurance template docs
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
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Directors Listing ')]")));
        element.click();

        Thread.sleep(1000);
        WebElement uploadRent = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("fileDrop")));
        uploadRent.sendKeys(System.getProperty("user.dir") + '/' + "testDFA.xlsx");

        //Save
        JavascriptExecutor js381= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[6]/app-component-wrapper/app-supporting-documents/mat-card/mat-card-content/div[4]/div/app-dfa-attachment/form/div/mat-card/div[2]/div[2]/button/span[1]")));
        js381.executeScript("arguments[0].click();", element);

        Thread.sleep(2000);
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Registration Proof ')]")));
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

        JavascriptExecutor jsa= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' + Add Structure and Purpose ')]")));
        jsa.executeScript("arguments[0].click();", element);

        Thread.sleep(1000);
        WebElement uploadStr = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.id("fileDrop")));
        uploadStr.sendKeys(System.getProperty("user.dir") + '/' + "AddStructureAndPurpose.docx");

        //Save
        Thread.sleep(1000);
        JavascriptExecutor js383= (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/app-root/div/main/div/app-dfa-application-main/div/mat-horizontal-stepper/div/div[2]/div[6]/app-component-wrapper/app-supporting-documents/mat-card/mat-card-content/div[6]/div/app-dfa-attachment/form/div/mat-card/div[2]/div[2]/button")));
        js383.executeScript("arguments[0].click();", element);
        Thread.sleep(2000);

        JavascriptExecutor jsb = (JavascriptExecutor) driver;
        element = driverWait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), ' Next - Review Submission ')]")));
        jsb.executeScript("arguments[0].click();", element);

        //Sign and Submit
        HomeOwnerApplicationDetails signSubmit = new HomeOwnerApplicationDetails();
        signSubmit.submit(element, driverWait, driver);

    }
}
