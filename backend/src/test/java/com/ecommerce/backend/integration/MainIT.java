package com.ecommerce.backend.integration;

import com.ecommerce.backend.Main;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MainIT {

	@Test
	void contextLoads() {
	}

	@Test
	public void testRunMain() {
		Main.main(new String[] {});
	}
}
