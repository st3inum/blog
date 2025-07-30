/*............bismillahir rahmanir rahim...............*/

// author :  Muhammad Najmul Hasan Nayeem (SUST MATH 17)

#include<bits/stdc++.h>
using namespace std;
const int inf = -2000000000;
void solve(int tcase) {
    int n;
    while (cin >> n && n) {
        vector<int> a(n);
        for (auto &i: a) cin >> i;
        sort(a.begin(), a.end());
        map<int, bool> mp;
        int res = inf;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int x = a[j] - a[i];
                if (mp[x]) res = max(res, a[j]);
                if (mp[-x]) res = max(res, a[i]);
            }
            for (int j = 0; j < i; j++) {
                int x = a[j] + a[i];
                mp[x] = true;
            }
        }
        reverse(a.begin(), a.end());
        mp.clear();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int x = a[j] - a[i];
                if (mp[x]) res = max(res, a[j]);
                if (mp[-x]) res = max(res, a[i]);
            }
            for (int j = 0; j < i; j++) {
                int x = a[j] + a[i];
                mp[x] = true;
            }
        }
        if (res == inf) cout << "no solution\n";
        else cout << res << '\n';
    }
}

int32_t main() {
    ios_base::sync_with_stdio(false);cin.tie(NULL);//cout.tie(NULL);
    int q = 1;
    // cin >> q;
    for(int tcase = 1; tcase <= q; tcase++) solve(tcase);
    return 0;
}