package com.ecommerce.backend.util.security.jwt;

import com.ecommerce.backend.util.constants.VariableConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@RequiredArgsConstructor
@Service
public class JwtService {
    private static final String SECRET_KEY =
            "645267556B58703273357638792F413F4428472B4B6250655368566D59713374";
    private final VariableConstants variableConstants;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        var claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        var keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String subject, Date expiration) {
        return generateToken(subject, expiration, Map.of());
    }

    public String generateToken(String subject, Date expiration, String... scopes) {
        return generateToken(subject, expiration, Map.of("scopes", scopes));
    }

    public String generateToken(String subject, Date expiration, List<String> scopes) {
        return generateToken(subject, expiration, Map.of("scopes", scopes));
    }

    public String generateToken(
            String subject,
            Date expiration,
            Map<String, Object> claims
    ) {
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuer(variableConstants.getAPI_URL())
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(expiration)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        var username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        var today = Date.from(Instant.now());
        return extractExpiration(token).before(today);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
