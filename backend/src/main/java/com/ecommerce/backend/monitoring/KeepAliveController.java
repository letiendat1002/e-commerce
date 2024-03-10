package com.ecommerce.backend.monitoring;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/keep-alive")
@RestController
public class KeepAliveController {
    private final KeepAliveService keepAliveService;

    @GetMapping
    public void keepAlive() {
        keepAliveService.keepAlive();
    }
}
