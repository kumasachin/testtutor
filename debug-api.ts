import { ExamKitService } from "./src/lib/examkit-service";

async function testApiCall() {
  console.log("Testing Life in UK domain lookup...");

  // Test domain lookup
  const domainResult = await ExamKitService.getDomainByName("Life in UK");
  console.log("Domain lookup result:", JSON.stringify(domainResult, null, 2));

  if (domainResult.success && domainResult.data) {
    console.log("Found domain ID:", domainResult.data.id);

    // Test getting published tests for this domain
    const testsResult = await ExamKitService.getPublishedTests(
      domainResult.data.id
    );
    console.log("Tests result structure:", {
      success: testsResult.success,
      hasData: !!testsResult.data,
      testsLength: testsResult.data?.tests?.length || 0,
      firstTest: testsResult.data?.tests?.[0] || null,
    });

    if (testsResult.data?.tests?.length && testsResult.data.tests.length > 0) {
      console.log(
        "Sample test structure:",
        JSON.stringify(testsResult.data.tests[0], null, 2)
      );
    }
  }
}

testApiCall().catch(console.error);
