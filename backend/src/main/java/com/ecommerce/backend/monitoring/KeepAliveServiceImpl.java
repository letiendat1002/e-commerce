package com.ecommerce.backend.monitoring;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class KeepAliveServiceImpl implements KeepAliveService {
    private final KeepAliveDAO keepAliveDAO;

    @Override
    public void keepAlive() {
        keepAliveDAO.keepAlive();
    }
}
