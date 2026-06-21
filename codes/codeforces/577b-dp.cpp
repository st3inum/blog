#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    if (n >= m) return cout << "YES\n", 0;

    vector<int> dp(m);
    while (n--) {
        long long a;
        cin >> a;
        int x = a % m;
        auto ndp = dp;
        ndp[x] = 1;
        for (int r = 0; r < m; r++)
            if (dp[r]) ndp[(r + x) % m] = 1;
        dp = ndp;
        if (dp[0]) return cout << "YES\n", 0;
    }

    cout << "NO\n";
}
