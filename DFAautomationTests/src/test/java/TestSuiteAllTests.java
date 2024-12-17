import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;


@RunWith(Suite.class)
@Suite.SuiteClasses({

        Login.class, CreateNewApplicationHomeownerNoInsurance.class, HomeOwnerApplicationDetails.class, HomeOwnerWithnsurance.class,
        ResidentialTenantUInsurance.class, HmeownerUnsureInsurance.class, ResidentialTenantNInsurance.class, EditApplicationHomeownerNInsurance.class,
        Logout.class, AddCleanLogAndDamageAfterSubmit.class, SmallBusinessNoInsurance.class, SmallBusinessUnsureInsurance.class, CharitableOrganizationNoInsurance.class,
        FarmNoInsurance.class, FarmUnsureInsurance.class, CharitableOrganizationUnsureInsurance.class
})


public class TestSuiteAllTests {


    @Test
    public void test() throws Exception {

    }

}
