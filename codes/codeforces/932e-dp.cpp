#include <bits/stdc++.h>
using namespace std;
using ll = long long;

const ll mod = 1000000007;

ll power(ll a, ll p) {
    ll r = 1;
    for (; p; p >>= 1, a = a * a % mod)
        if (p & 1) r = r * a % mod;
    return r;
}

int32_t main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    ll n;
    int k;
    cin >> n >> k;

    vector<ll> dp(k + 1), ndp(k + 1);
    dp[0] = 1;
    for (int i = 1; i <= k; i++) {
        fill(ndp.begin(), ndp.end(), 0);
        for (int j = 1; j <= min<ll>(i, n); j++)
            ndp[j] = (dp[j] * j + dp[j - 1] * (n - j + 1)) % mod;
        swap(dp, ndp);
    }

    ll p = power(2, n), inv2 = (mod + 1) / 2, ans = 0;
    for (int j = 1; j <= min<ll>(n, k); j++) {
        p = p * inv2 % mod;
        ans = (ans + dp[j] * p) % mod;
    }
    cout << ans << '\n';
}
