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

vector<ll> berlekamp_massey(vector<ll> s) {
    vector<ll> C(1, 1), B(1, 1);
    ll b = 1;
    int L = 0, m = 1;

    for (int n = 0; n < (int)s.size(); n++) {
        ll d = 0;
        for (int i = 0; i <= L; i++) d = (d + C[i] * s[n - i]) % mod;
        if (!d) {
            m++;
            continue;
        }

        vector<ll> T = C;
        ll coef = d * power(b, mod - 2) % mod;
        if ((int)C.size() < (int)B.size() + m) C.resize(B.size() + m);
        for (int i = 0; i < (int)B.size(); i++)
            C[i + m] = (C[i + m] - coef * B[i] % mod + mod) % mod;

        if (2 * L <= n) {
            L = n + 1 - L;
            B = T;
            b = d;
            m = 1;
        } else m++;
    }

    C.resize(L + 1);
    vector<ll> rec(L);
    for (int i = 1; i <= L; i++) rec[i - 1] = (mod - C[i]) % mod;
    return rec;
}

vector<ll> combine(vector<ll> a, vector<ll> b, vector<ll> rec) {
    int n = rec.size();
    vector<ll> c(2 * n);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            c[i + j] = (c[i + j] + a[i] * b[j]) % mod;

    for (int i = 2 * n - 2; i >= n; i--)
        for (int j = 1; j <= n; j++)
            c[i - j] = (c[i - j] + c[i] * rec[j - 1]) % mod;

    c.resize(n);
    return c;
}

ll linear_rec(vector<ll> s, ll n) {
    vector<ll> rec = berlekamp_massey(s);
    int k = rec.size();
    if (n < (int)s.size()) return s[n] % mod;
    if (!k) return 0;

    s.resize(k);
    vector<ll> pol(k), e(k);
    pol[0] = 1;
    if (k == 1) e[0] = rec[0];
    else e[1] = 1;

    for (; n; n >>= 1, e = combine(e, e, rec))
        if (n & 1) pol = combine(pol, e, rec);

    ll ans = 0;
    for (int i = 0; i < k; i++) ans = (ans + pol[i] * s[i]) % mod;
    return ans;
}

int32_t main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int m;
    ll n;
    cin >> m >> n;
    vector<ll> s(m);
    for (ll &x : s) {
        cin >> x;
        x = (x % mod + mod) % mod;
    }
    cout << linear_rec(s, n) << '\n';
}
