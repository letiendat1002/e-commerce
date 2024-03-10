package com.ecommerce.backend.monitoring;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class KeepAliveJdbcDAOImpl implements KeepAliveDAO {
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void keepAlive() {
        jdbcTemplate.execute("SELECT 1");
    }
}
