package com.ecommerce.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MainTests {

	@Test
	void contextLoads() {
	}

	@Test
	public void testRunMain() {
		Main.main(new String[] {});
	}
}
