package com.ecommerce.backend.monitoring;

import com.ecommerce.backend.util.constants.VariableConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
@Component
@Log4j2
public class KeepAliveScheduler {
    private final VariableConstants variableConstants;

    private void logError(Throwable error) {
        log.error("Keep alive error: {}", error.getMessage());
    }

    private void logSuccess(Void success) {
        log.info("Keep alive success");
    }

    @Scheduled(fixedRate = 600000)
    public void keepAlive() {
        var webClient = WebClient.create(variableConstants.getAPI_URL());
        webClient.get()
                .uri("/api/v1/keep-alive")
                .retrieve()
                .bodyToMono(Void.class)
                .doOnSuccess(this::logSuccess)
                .doOnError(this::logError)
                .subscribe();
    }
}
