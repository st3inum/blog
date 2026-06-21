#include <bits/stdc++.h>
using namespace std;

const int N = 1005;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;
    if (n >= m) return cout << "YES\n", 0;

    bitset<N> dp, mask;
    for (int i = 0; i < m; i++) mask[i] = 1;

    for (int i = 0; i < n; i++) {
        long long a;
        cin >> a;
        int x = a % m;
        dp |= ((dp << x) | (dp >> (m - x))) & mask;
        dp[x] = 1;
        if (dp[0]) return cout << "YES\n", 0;
    }

    cout << "NO\n";
}
